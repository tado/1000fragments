uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.89 + jf * 4.0), cos(t * 0.30 * jf)) * 0.53;
        xs += sin(length(p - im) * 91.30 - t * 13.25 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.97;
	{ float fr = length(p); p *= 1.0 + -0.63 * fr * fr; }
	p = abs(p) - 0.53;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.28 + time * 0.17, vec3(0.48, 0.53, 0.59), vec3(0.44, 0.44, 0.42), vec3(0.74, 1.10, 0.94), vec3(0.09, 0.84, 0.25));
	col = clamp((col - 0.5) * 1.36 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
