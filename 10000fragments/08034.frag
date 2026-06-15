uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.55 + 0.22 * cos(sa * 9 + t * 1.91 + ph);
    v = sin((sr - petal) * 17.44);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.74 + jf * 4.0), cos(t * 0.46 * jf)) * 0.91;
        xs += sin(length(p - im) * 131.71 - t * 9.22 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(-0.63, -0.71) * sin(length(p) * 4.15 - time * 0.93) * 0.27;
	p = rot2(length(p) * -3.50 + time * 0.37) * p;
	p = rot2(2.78) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.19);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.04 + time * 0.00, vec3(0.50, 0.51, 0.55), vec3(0.47, 0.46, 0.49), vec3(1.27, 1.12, 1.31), vec3(0.61, 0.56, 0.81));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
