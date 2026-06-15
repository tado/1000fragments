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
    v = sin(sa * 3.89 + sr * 15.34 - t * 3.34 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.27 + jf * 4.0), cos(t * 0.27 * jf)) * 0.57;
        xs += sin(length(p - im) * 166.67 - t * 13.38 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.33;
	p = rot2(0.85) * p;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.26; p = rot2(0.60) * p; }
	p = rot2(p.y * 1.84 + time * 0.38) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.41);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 0.52 + time * 0.06, vec3(0.55, 0.41, 0.57), vec3(0.48, 0.46, 0.44), vec3(0.70, 1.34, 0.76), vec3(0.38, 0.45, 0.01));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
