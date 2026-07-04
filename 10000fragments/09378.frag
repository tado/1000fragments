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
        vec2 im = vec2(sin(t * 0.53 + jf * 4.0), cos(t * 0.56 * jf)) * 0.44;
        xs += sin(length(p - im) * 91.53 - t * 7.02 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 1.93 + t * 1.05) - 0.5) * 2.0;
    v = sin((p.y * 7.46 + zx * 1.38 + t * 1.94) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.05;
	{ float fr = length(p); p *= 1.0 + 0.59 * fr * fr; }
	p *= 1.0 + 0.31 * sin(time * 3.89);
	p *= 2.46;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.13; p = rot2(1.23) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.65);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.51 + time * 0.18, vec3(0.52, 0.41, 0.45), vec3(0.49, 0.41, 0.47), vec3(1.28, 1.01, 1.18), vec3(0.81, 0.20, 0.23));
	col *= 0.89 + 0.11 * sin(gl_FragCoord.y * 1.56 + time * 6.91);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
