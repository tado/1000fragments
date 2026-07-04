uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 10.97 + vec2(t * 0.39, -t * 2.94) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.79;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.90) * p * 20.01;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.60;
	float v = smoothstep(rad, rad - 0.16, length(hf));
	vec3 col = mix(vec3(0.03, 0.15, 0.14), vec3(0.83, 0.71, 0.74), v);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
