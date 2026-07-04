uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 3.33 + t * 1.04) - 0.5) * 2.0;
    v = sin((p.y * 3.47 + zx * 0.62 + t * 2.84) * 3.1415927 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 3.53 + ga * 3.0 - t * 0.62 + ph);
    v = arm * exp(-gr * 0.87);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.66 + jf * 4.0), cos(t * 0.45 * jf)) * 0.72;
        xs += sin(length(p - im) * 206.85 - t * 13.04 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.62;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.77);
	float d3 = fieldC(q3, time, 0.70);
	d2 = d2 * d3;
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 1.28 + time * 0.33, vec3(0.55, 0.49, 0.52), vec3(0.47, 0.49, 0.37), vec3(0.81, 1.11, 1.23), vec3(0.71, 0.27, 0.05));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
