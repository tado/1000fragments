uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.21, 0.0)) * 12.22 - t * 3.96 + ph);
    float mb = sin(length(p + vec2(0.21, 0.0)) * 10.17 - t * 3.96 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.46, lr * 2.00 + time * -0.56); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.96 + time * 0.09, vec3(0.52, 0.53, 0.57), vec3(0.44, 0.34, 0.42), vec3(0.72, 1.06, 1.17), vec3(0.85, 0.76, 0.32));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
