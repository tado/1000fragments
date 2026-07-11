uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.57 + jf * 4.0), cos(t * 0.30 * jf)) * 0.76;
        xs += sin(length(p - im) * 200.32 - t * 6.56 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.93;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(1.27) * p * 22.62;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.67;
	float v = smoothstep(rad, rad - 0.12, length(hf));
	vec3 col = palette(d * 1.36 + time * 0.25, vec3(0.52, 0.52, 0.43), vec3(0.43, 0.46, 0.33), vec3(1.25, 1.19, 1.27), vec3(0.61, 0.95, 0.96)) * v;
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
