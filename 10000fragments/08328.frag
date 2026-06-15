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
        vec2 im = vec2(sin(t * 0.18 + jf * 4.0), cos(t * 0.52 * jf)) * 0.63;
        xs += sin(length(p - im) * 205.46 - t * 13.73 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.58) - 0.5;
    float rad = 0.45 + 0.12 * sin(t * 1.23 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.99;
	p = rot2(length(p) * -3.32 + time * 1.09) * p;
	p *= 2.75;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.39; p = rot2(0.63) * p; }
	p = rot2(3.03) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.76);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.78 + time * 0.05, vec3(0.41, 0.47, 0.55), vec3(0.41, 0.44, 0.35), vec3(0.81, 1.18, 0.92), vec3(0.38, 0.14, 0.66));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.41));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
