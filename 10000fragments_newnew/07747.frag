uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 6; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.86 * sin(mf + 3.0) + ph), cos(t * 1.53 * cos(mf + 3.0) + ph));
        ms += 0.053 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.94) * p * 14.68;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.63;
	float v = smoothstep(rad, rad - 0.12, length(hf));
	vec3 col = palette(d * 1.29 + time * 0.11, vec3(0.48, 0.56, 0.53), vec3(0.44, 0.37, 0.34), vec3(0.89, 0.79, 0.89), vec3(0.19, 0.92, 0.38)) * v;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
