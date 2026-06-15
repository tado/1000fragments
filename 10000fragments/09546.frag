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
        vec2 im = vec2(sin(t * 0.28 + jf * 4.0), cos(t * 0.39 * jf)) * 0.47;
        xs += sin(length(p - im) * 129.23 - t * 4.40 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(2.58) * p;
	p = abs(p) - 0.39;
	{ float fr = length(p); p *= 1.0 + 0.43 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.26 + time * 0.20, vec3(0.56, 0.41, 0.48), vec3(0.37, 0.43, 0.30), vec3(0.96, 0.83, 0.79), vec3(0.44, 0.32, 0.81));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.31));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
