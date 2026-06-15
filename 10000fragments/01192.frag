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
        vec2 im = vec2(sin(t * 0.64 + jf * 4.0), cos(t * 0.32 * jf)) * 0.42;
        xs += sin(length(p - im) * 82.34 - t * 9.03 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 2.03) - 0.5;
    float rad = 0.24 + 0.12 * sin(t * 0.51 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.73;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.20);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.07 + time * 0.02, vec3(0.55, 0.42, 0.53), vec3(0.45, 0.44, 0.38), vec3(1.25, 0.83, 1.34), vec3(0.73, 0.12, 0.57));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
