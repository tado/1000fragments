uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.52) - 0.5;
    float rad = 0.21 + 0.12 * sin(t * 1.88 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ p = vec2(atan(p.y, p.x) * 2.88, length(p) * 2.83 - time * 0.50); }
	p = rot2(p.y * -2.80 + time * 0.98) * p;
	p = rot2(time * -0.81) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.11, 0.42, 0.51), vec3(0.87, 0.81, 0.93), d);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.89));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
