uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.16 + 0.36 * sin(t * 0.46)) + vec2(-0.78, 0.24) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 23; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 23.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.79;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.23, lr * 2.55 + time * -0.48); }
	p = abs(p);
	{ p = vec2(atan(p.y, p.x) * 2.39, length(p) * 2.85 - time * 0.88); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.02 + time * 0.02, vec3(0.55, 0.42, 0.49), vec3(0.44, 0.44, 0.42), vec3(1.40, 0.93, 0.70), vec3(0.93, 0.38, 0.76));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
