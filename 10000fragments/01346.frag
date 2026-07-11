uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.88 + t * 3.81 + ph) + sin(p.y * 7.05 - t * 3.81 + ph)
        + sin((p.x + p.y) * 5.07 + t * 3.81 + ph) + sin(length(p) * 5.57 - t * 3.81 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.88;
	p = rot2(2.80) * p;
	p = rot2(time * 0.70) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.30, 0.41, 0.16), vec3(0.67, 0.76, 0.56), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
