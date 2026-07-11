uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.51 + jf * 4.0), cos(t * 0.47 * jf)) * 0.81;
        xs += sin(length(p - im) * 102.95 - t * 9.64 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 6.30;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 9.76 - t * 2.63 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.76;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.74);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.41 + time * 0.21, vec3(0.46, 0.44, 0.58), vec3(0.44, 0.48, 0.31), vec3(1.36, 0.76, 0.93), vec3(0.36, 0.34, 0.43));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
