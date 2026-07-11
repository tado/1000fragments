uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 6.20 + t * 0.87 + ph) + sin(p.y * 13.67 - t * 0.76 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.81;
	p = fract(p * 1.79) - 0.5;
	p = rot2(length(p) * -2.92 + time * 0.32) * p;
	p = rot2(p.y * 3.59 + time * 0.58) * p;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.37; p = rot2(1.15) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.38), field(p, time, 2.75));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.74));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
