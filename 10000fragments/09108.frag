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
        vec2 im = vec2(sin(t * 0.72 + jf * 4.0), cos(t * 0.13 * jf)) * 0.65;
        xs += sin(length(p - im) * 104.10 - t * 5.24 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.97;
	p = fract(p * 2.55) - 0.5;
	p = rot2(length(p) * -3.39 + time * 1.10) * p;
	p = rot2(time * -0.34) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.96 + time * 0.20, vec3(0.51, 0.47, 0.42), vec3(0.40, 0.33, 0.37), vec3(0.81, 0.98, 0.73), vec3(0.05, 0.98, 0.06));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
