uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.31, 0.0)) * 12.12 - t * 2.50 + ph);
    float mb = sin(length(p + vec2(0.31, 0.0)) * 19.31 - t * 6.79 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.61;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.35 / 3.1415927, 1.00 / r - time * 1.99);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.40, 0.29, 0.53) * (0.24 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	col *= clamp(r * 2.79, 0.0, 1.0);
	col *= 0.84 + 0.15 * sin(gl_FragCoord.y * 1.00 + time * 15.52);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
