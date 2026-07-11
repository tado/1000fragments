uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.43) - 0.5;
    float rad = 0.26 + 0.12 * sin(t * 2.89 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.14;
	p *= 1.21;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.15; p = rot2(2.59) * p; }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.27, 0.06, 0.52), vec3(0.73, 0.69, 0.92), d);
	col = fract(col * 1.33);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
