uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 15.57 + t * 3.18 + ph) + sin(p.y * 3.17 - t * 3.29 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.17;
	p = rot2(p.y * 3.21 + time * 0.22) * p;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.23; p = rot2(0.87) * p; }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.44, 0.56, 1.47) + vec3(0.27, 0.09, 0.12);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
