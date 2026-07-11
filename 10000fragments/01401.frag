uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 33.10 - t * 7.92 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(length(p) * -1.49 + time * 0.74) * p;
	p += vec2(-0.82, -0.51) * sin(length(p) * 5.56 - time * 1.06) * 0.33;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.30, 0.35, 0.27), vec3(0.94, 0.83, 0.57), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
