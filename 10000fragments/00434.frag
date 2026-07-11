uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 11.07 + t * 3.99 + ph) + sin(p.y * 6.01 - t * 2.45 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.95;
	p *= 3.23;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.44; p = rot2(1.87) * p; }
	p = rot2(time * 1.00) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.16, 0.54, 0.91) + vec3(0.07, 0.20, 0.17);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
