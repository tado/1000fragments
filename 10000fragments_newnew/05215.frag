uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.45) - 0.5;
    float rad = 0.21 + 0.12 * sin(t * 1.52 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.54, 0.0)) * 16.47 - t * 1.77 + ph);
    float mb = sin(length(p + vec2(0.54, 0.0)) * 28.71 - t * 1.78 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 1.64));
	p *= 3.09;
	p = (floor(p * 7.1) + 0.5) / 7.1;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.67);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.63 + time * 0.14, vec3(0.50, 0.59, 0.59), vec3(0.40, 0.33, 0.38), vec3(0.87, 1.24, 1.23), vec3(0.48, 0.75, 0.12));
	col *= 0.84 + 0.18 * sin(gl_FragCoord.y * 1.32 + time * 17.79);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
