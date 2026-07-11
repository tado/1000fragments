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
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.57 + jf * 4.0), cos(t * 0.43 * jf)) * 0.64;
        xs += sin(length(p - im) * 118.77 - t * 7.37 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.59 + jf * 4.0), cos(t * 0.12 * jf)) * 0.96;
        xs += sin(length(p - im) * 215.20 - t * 8.41 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.71;
	p = rot2(time * -0.58) * p;
	p = rot2(p.y * -2.54 + time * 0.91) * p;
	p = fract(p * 2.17) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.24);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.75 + time * 0.10, vec3(0.40, 0.43, 0.56), vec3(0.40, 0.33, 0.47), vec3(0.85, 1.38, 0.78), vec3(0.95, 0.00, 0.78));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
