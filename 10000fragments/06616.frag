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
        vec2 im = vec2(sin(t * 0.68 + jf * 4.0), cos(t * 0.34 * jf)) * 0.75;
        xs += sin(length(p - im) * 111.56 - t * 13.92 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.55;
	p = abs(p);
	p = rot2(length(p) * 3.95 + time * 0.80) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.97 + time * 0.13, vec3(0.59, 0.52, 0.40), vec3(0.36, 0.47, 0.40), vec3(1.39, 1.33, 1.17), vec3(0.57, 0.42, 0.66));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.01));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
