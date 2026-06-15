uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.26, 0.0)) * 26.44 - t * 6.50 + ph);
    float mb = sin(length(p + vec2(0.26, 0.0)) * 35.01 - t * 6.50 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.48; p = rot2(1.49) * p; }
	{ float fr = length(p); p *= 1.0 + -0.41 * fr * fr; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.53), field(p, time, 1.07));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.81, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
