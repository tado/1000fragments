uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 18.59 + t * 3.84 + ph) * 0.7;
    float wb = sin(p.y * 4.73 - t * 2.08 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.52;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.10;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.52; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.60, lr * 2.68 + time * -0.74); }
	p += vec2(-0.59, 0.95) * sin(length(p) * 4.63 - time * 1.93) * 0.25;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.71 + time * 0.13, vec3(0.45, 0.48, 0.55), vec3(0.34, 0.45, 0.42), vec3(1.36, 1.00, 1.21), vec3(0.28, 0.37, 0.50));
	col = fract(col * 1.02);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
