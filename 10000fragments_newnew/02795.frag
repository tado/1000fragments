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
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.50 + jf * 4.0), cos(t * 0.21 * jf)) * 0.79;
        xs += sin(length(p - im) * 200.44 - t * 8.26 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.73;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(1.24) * p * 11.10;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.66;
	float v = smoothstep(rad, rad - 0.13, length(hf));
	vec3 col = palette(d * 1.00 + time * 0.08, vec3(0.53, 0.53, 0.45), vec3(0.42, 0.40, 0.39), vec3(0.81, 1.16, 1.25), vec3(0.34, 0.63, 0.52)) * v;
	col = mod(col * 1.80, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
