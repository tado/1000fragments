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
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.82 + jf * 4.0), cos(t * 0.51 * jf)) * 0.68;
        xs += sin(length(p - im) * 64.24 - t * 5.12 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.34 + t * 1.24 + ph) + sin(p.y * 4.65 - t * 1.24 + ph)
        + sin((p.x + p.y) * 4.22 + t * 1.24 + ph) + sin(length(p) * 16.45 - t * 1.24 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.54;
	p = abs(p) - 0.28;
	p = rot2(2.83) * p;
	p += vec2(-0.12, -0.74) * sin(length(p) * 3.02 - time * 0.63) * 0.26;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.43);
	float d = d1 + d2;
	vec3 col = palette(d * 1.23 + time * 0.12, vec3(0.42, 0.59, 0.60), vec3(0.39, 0.48, 0.39), vec3(0.91, 1.21, 0.84), vec3(0.12, 0.08, 0.57));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
