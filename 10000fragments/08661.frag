uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.39;
    float pk = 6.2831853 / 5.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 8.11 - t * 3.10 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 7.39; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 20.15 - t * 0.96 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.37; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.90);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.30 + time * 0.28, vec3(0.55, 0.49, 0.41), vec3(0.42, 0.48, 0.42), vec3(1.05, 0.89, 0.95), vec3(0.06, 0.88, 0.60));
	col = mod(col * 1.50, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
