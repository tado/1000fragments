uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.64 + jf * 4.0), cos(t * 0.16 * jf)) * 0.37;
        xs += sin(length(p - im) * 169.69 - t * 6.18 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 20.67 - t * 5.96 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.15;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.62);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.69 + time * 0.26, vec3(0.44, 0.54, 0.47), vec3(0.48, 0.48, 0.48), vec3(1.18, 1.20, 1.06), vec3(0.53, 0.93, 0.61));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.19));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
