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
    for(int mi = 0; mi < 7; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.47 * sin(mf + 3.0) + ph), cos(t * 1.47 * cos(mf + 3.0) + ph));
        ms += 0.066 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.41;
	p *= 1.87;
	p = rot2(time * -1.32) * p;
	p = fract(p * 1.48) - 0.5;
	p += vec2(0.48, -0.56) * sin(length(p) * 4.79 - time * 0.60) * 0.11;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.58 + time * 0.28, vec3(0.56, 0.40, 0.41), vec3(0.47, 0.49, 0.49), vec3(0.74, 1.08, 0.79), vec3(0.19, 0.50, 0.11));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
