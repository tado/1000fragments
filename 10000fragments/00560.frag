uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 4.72 + sin(p.y * 3.07 + t * 0.87) * 1.66 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(p.y * 1.84 + time * 0.40) * p;
	p = rot2(length(p) * -3.63 + time * 1.07) * p;
	p = rot2(1.00) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.43, 0.33, 0.04), vec3(0.87, 0.64, 0.59), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
