uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.30, 0.0)) * 23.60 - t * 6.87 + ph);
    float mb = sin(length(p + vec2(0.30, 0.0)) * 36.60 - t * 6.58 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.37, lr * 1.25 + time * 0.47); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.28, 0.29, 0.19), vec3(0.65, 0.68, 0.76), d);
	col *= 0.83 + 0.15 * sin(gl_FragCoord.y * 1.05 + time * 6.94);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
