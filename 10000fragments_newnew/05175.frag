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
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.14 + jf * 4.0), cos(t * 0.54 * jf)) * 0.80;
        xs += sin(length(p - im) * 99.41 - t * 8.90 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.37;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(1.25) * p * 13.66;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.51;
	float v = smoothstep(rad, rad - 0.18, length(hf));
	vec3 col = palette(d * 0.68 + time * 0.04, vec3(0.58, 0.50, 0.53), vec3(0.49, 0.46, 0.37), vec3(1.03, 1.29, 1.15), vec3(0.41, 0.23, 0.46)) * v;
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
