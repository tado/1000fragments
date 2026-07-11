uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 14.80 + t * 0.73 + ph) * 0.7;
    float wb = sin(p.y * 6.70 - t * 1.00 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.69;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.56;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(1.12) * p * 17.02;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.61;
	float v = smoothstep(rad, rad - 0.13, length(hf));
	vec3 col = mix(vec3(0.84, 0.92, 0.78), vec3(0.09, 0.15, 0.20), v);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.06));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
