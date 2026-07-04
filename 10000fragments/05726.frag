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
        vec2 im = vec2(sin(t * 0.40 + jf * 4.0), cos(t * 0.13 * jf)) * 0.86;
        xs += sin(length(p - im) * 128.37 - t * 11.03 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 3.35 + ga * 4.0 - t * 2.02 + ph);
    v = arm * exp(-gr * 1.31);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 1.43));
	p = (floor(p * 16.1) + 0.5) / 16.1;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.52; }
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.52; p = rot2(2.19) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.44);
	float d = d1 * d2;
	vec3 col = palette(d * 0.56 + time * 0.02, vec3(0.51, 0.46, 0.42), vec3(0.36, 0.47, 0.42), vec3(1.32, 1.21, 1.25), vec3(0.75, 0.35, 0.63));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.57));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
