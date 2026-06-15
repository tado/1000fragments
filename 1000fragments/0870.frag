uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 11.94 - t * 5.54 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.87 + jf * 4.0), cos(t * 0.49 * jf)) * 0.64;
        xs += sin(length(p - im) * 154.16 - t * 11.68 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.29;
	p = fract(p * 1.81) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.76);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.69 + time * 0.08, vec3(0.57, 0.45, 0.57), vec3(0.50, 0.38, 0.33), vec3(0.83, 0.81, 1.16), vec3(0.39, 0.38, 0.80));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
