uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.31 + 0.17 * sin(t * 0.54)) + vec2(-0.24, 0.09) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 26; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 26.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.72;
	p += vec2(0.17, 0.15) * sin(length(p) * 5.56 - time * 2.49) * 0.18;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.38, lr * 2.87 + time * 0.87); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.50, 0.38, 0.43) * (0.21 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
