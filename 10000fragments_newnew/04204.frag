uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.44 + 0.34 * sin(t * 1.47)) + vec2(-0.65, 0.27) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 27; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 27.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.06;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.46) * p * 13.83;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.64;
	float v = smoothstep(rad, rad - 0.13, length(hf));
	vec3 col = palette(d * 1.49 + time * 0.17, vec3(0.48, 0.46, 0.41), vec3(0.47, 0.39, 0.44), vec3(0.84, 0.99, 0.94), vec3(0.73, 0.61, 0.01)) * v;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
