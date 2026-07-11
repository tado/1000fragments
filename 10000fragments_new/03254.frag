uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 3.10;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 1.28)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 16.74 - t * 7.25 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.68;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.55 / 3.1415927, 1.36 / r - time * 2.29);
	tv.x += tv.y * 0.19;
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.06 + time * 0.36);
	col *= clamp(r * 2.49, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
