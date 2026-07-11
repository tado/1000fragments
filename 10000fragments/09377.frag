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
        vec2 im = vec2(sin(t * 0.31 + jf * 4.0), cos(t * 0.16 * jf)) * 0.36;
        xs += sin(length(p - im) * 82.99 - t * 10.50 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.96 + t * 3.61 + ph) + sin(p.y * 10.72 - t * 3.61 + ph)
        + sin((p.x + p.y) * 6.41 + t * 3.61 + ph) + sin(length(p) * 7.21 - t * 3.61 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.12;
	p = rot2(time * 1.01) * p;
	p = rot2(0.71) * p;
	p *= 1.45;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.75);
	float d = d1 + d2;
	vec3 col = palette(d * 1.09 + time * 0.19, vec3(0.44, 0.54, 0.59), vec3(0.47, 0.43, 0.33), vec3(1.31, 0.91, 0.97), vec3(0.41, 0.33, 1.00));
	col = mod(col * 2.23, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
