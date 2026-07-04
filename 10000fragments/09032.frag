uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 8.94 + t * 3.69 + ph) * 0.7;
    float wb = sin(p.y * 5.57 - t * 1.09 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.66;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.36) * p * 18.63;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.73;
	float v = smoothstep(rad, rad - 0.08, length(hf));
	vec3 col = mix(vec3(0.86, 0.94, 0.93), vec3(0.03, 0.05, 0.12), v);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
