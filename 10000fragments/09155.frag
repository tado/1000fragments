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
        vec2 im = vec2(sin(t * 0.11 + jf * 4.0), cos(t * 0.26 * jf)) * 0.60;
        xs += sin(length(p - im) * 138.44 - t * 8.23 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.93;
	p = rot2(length(p) * 3.33 + time * 0.93) * p;
	p += vec2(-0.06, 0.70) * sin(length(p) * 4.16 - time * 1.60) * 0.31;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.57 + time * 0.21, vec3(0.50, 0.47, 0.47), vec3(0.32, 0.46, 0.42), vec3(1.09, 1.24, 1.07), vec3(0.66, 0.76, 0.54));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
