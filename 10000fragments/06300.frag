uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.50, 0.0)) * 25.11 - t * 5.16 + ph);
    float mb = sin(length(p + vec2(0.50, 0.0)) * 11.44 - t * 3.96 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.29;
	p.x += sin(p.y * 2.31 + time * 3.24) * 0.22;
	{ float fr = length(p); p *= 1.0 + 0.55 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.80 + time * 0.01);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
