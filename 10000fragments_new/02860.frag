uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.31, 0.0)) * 16.65 - t * 1.92 + ph);
    float mb = sin(length(p + vec2(0.31, 0.0)) * 19.89 - t * 6.66 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.71;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.95 / 3.1415927, 1.20 / r + time * 0.63);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 1.70 + time * 0.17);
	col *= clamp(r * 1.41, 0.0, 1.0);
	col = fract(col * 1.21);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
