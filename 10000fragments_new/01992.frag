uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.47 + 0.33 * sin(t * 0.44)) + vec2(-0.56, 0.07) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 28; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 28.0 * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.35) - 0.5;
    float rad = 0.43 + 0.12 * sin(t * 0.89 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.74, lr * 1.91 + time * 0.38); }
	p = (floor(p * 29.7) + 0.5) / 29.7;
	p *= 2.87;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.53);
	float d = d1 + d2;
	vec3 col = palette(d * 1.64 + time * 0.23, vec3(0.57, 0.48, 0.57), vec3(0.43, 0.49, 0.49), vec3(1.16, 1.32, 0.84), vec3(0.98, 0.18, 0.61));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
