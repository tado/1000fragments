uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 17.75 + t * 0.70 + ph) * 0.7;
    float wb = sin(p.y * 18.87 - t * 1.04 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.37;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.46;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(1.20) * p * 22.80;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.60;
	float v = smoothstep(rad, rad - 0.17, length(hf));
	vec3 col = mix(vec3(0.04, 0.04, 0.13), vec3(0.73, 0.87, 0.75), v);
	col *= 0.89 + 0.12 * sin(gl_FragCoord.y * 1.17 + time * 10.83);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
