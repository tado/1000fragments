uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 18.32 + t * 1.41 + ph) * 0.7;
    float wb = sin(p.y * 16.15 - t * 3.23 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.40;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.50;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.74) * p * 11.09;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.75;
	float v = smoothstep(rad, rad - 0.11, length(hf));
	vec3 col = mix(vec3(0.03, 0.14, 0.15), vec3(0.87, 0.82, 0.75), v);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
