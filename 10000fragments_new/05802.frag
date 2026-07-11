uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.37) - 0.5;
    float rad = 0.32 + 0.12 * sin(t * 3.35 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.56;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.20, lr * 2.20 + time * -0.30); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.99 + time * 0.26, vec3(0.45, 0.54, 0.44), vec3(0.36, 0.48, 0.32), vec3(1.13, 0.81, 1.05), vec3(0.41, 0.18, 0.01));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
