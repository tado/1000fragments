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
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.11 + jf * 4.0), cos(t * 0.38 * jf)) * 0.76;
        xs += sin(length(p - im) * 139.55 - t * 10.58 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(time * -0.68) * p;
	p = rot2(length(p) * 3.03 + time * 1.19) * p;
	p = rot2(1.87) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.18 + time * 0.15, vec3(0.47, 0.44, 0.47), vec3(0.34, 0.40, 0.43), vec3(1.35, 0.82, 1.24), vec3(1.00, 0.89, 0.10));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
