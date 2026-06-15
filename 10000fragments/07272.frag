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
        vec2 im = vec2(sin(t * 0.32 + jf * 4.0), cos(t * 0.42 * jf)) * 0.83;
        xs += sin(length(p - im) * 96.09 - t * 11.29 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.44;
	p = rot2(1.42) * p;
	{ float fr = length(p); p *= 1.0 + -0.43 * fr * fr; }
	p = abs(p) - 0.54;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.74 + time * 0.17, vec3(0.59, 0.55, 0.46), vec3(0.37, 0.33, 0.40), vec3(1.23, 0.88, 0.86), vec3(0.58, 0.00, 0.66));
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
