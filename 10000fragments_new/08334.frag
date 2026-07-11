uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 4.51;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 1.55)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 20.27 - t * 3.58 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.26 / 3.1415927, 0.61 / r + time * 2.18);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.76, 0.87, 0.88) * (0.20 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	col *= clamp(r * 2.16, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
